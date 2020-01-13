import { Lincoln } from '@nofrills/lincoln'
import { CreateLogger } from '@nofrills/lincoln-debug'

const lincoln: Lincoln = CreateLogger('nativecode')
const Logger: Lincoln = lincoln

export default Logger
