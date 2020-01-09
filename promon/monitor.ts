import chalk from 'chalk'
import ts, { Diagnostic } from 'typescript'
import { fs } from '@nofrills/fs'
import { all } from 'promise-parallel-throttle'

import { MonoProject, monorepo } from './projects'

async function compile(project: MonoProject): Promise<ts.WatchOfConfigFile<ts.SemanticDiagnosticsBuilderProgram>> {
  const formatHost: ts.FormatDiagnosticsHost = {
    getCanonicalFileName: path => path,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: () => ts.sys.newLine,
  }

  function reportDiagnostic(diagnostic: Diagnostic) {
    console.error(
      chalk.red('Error'),
      project.name,
      diagnostic.code,
      ':',
      ts.flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine()).trim(),
    )
  }

  function reportWatchStatusChanged(diagnostic: Diagnostic) {
    const ignored = [6031]

    if (ignored.includes(diagnostic.code)) {
      return
    }

    console.info(project.name, chalk.grey(ts.formatDiagnostic(diagnostic, formatHost).trim()))
  }

  const createProgram = ts.createEmitAndSemanticDiagnosticsBuilderProgram
  const tspath = fs.join(project.location, 'tsconfig.json')
  const host = ts.createWatchCompilerHost(tspath, {}, ts.sys, createProgram, reportDiagnostic, reportWatchStatusChanged)

  const originalCreateProgram = host.createProgram
  host.createProgram = (files, options, host, old) => {
    return originalCreateProgram(files, options, host, old)
  }

  const originalPostProgramCreate = host.afterProgramCreate!
  host.afterProgramCreate = program => {
    originalPostProgramCreate(program)
  }

  return ts.createWatchProgram(host)
}

async function main() {
  const projects = await monorepo()
  console.log('promon started')

  const tasks = projects
    .filter(project => project.package.typings)
    .map(project => async () => {
      const result = await compile(project)
      return result
    })

  const programs = await all(tasks, { maxInProgress: 1 })
  process.on('SIGINT', () => programs.forEach(program => program.close()))
}

main().catch(console.error)
