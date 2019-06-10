import { CreateLogger, Lincoln } from '@nofrills/lincoln-debug'

const lincoln: Lincoln = CreateLogger('nativecode')
const Logger: Lincoln = lincoln.extend('radarr')

export default Logger
