export interface TranscodeSession {
  key: string
  throttled: string
  complete: string
  progress: string
  speed: string
  duration: string
  remaining: string
  context: string
  sourceVideoCodec: string
  sourceAudioCodec: string
  videoDecision: string
  audioDecision: string
  protocol: string
  container: string
  videoCodec: string
  audioCodec: string
  audioChannels: string
  transcodeHwRequested: string
  transcodeHwFullPipeline: string
  timeStamp: string
  maxOffsetAvailable: string
  minOffsetAvailable: string
}
