import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.use(chaiAsPromised).expect

export default expect
export const TIMEOUT_LONG: number = 10000
export const TIMEOUT_SHORT: number = 5000
