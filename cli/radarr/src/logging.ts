import { CreateLogger, CreateOptions } from '@nofrills/lincoln-debug'

const options = CreateOptions('radarr-cli')
const logger = CreateLogger(options)

export default logger
