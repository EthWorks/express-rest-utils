import { Result } from '@restless/sanitizers'
import { expect } from 'chai'
import { BigNumber } from 'ethers'
import { asBigNumber } from '../src/asBigNumber'

describe('asBigNumber', () => {
  it('sanitizes strings that are valid big numbers', async () => {
    const result = asBigNumber('1234', '')
    expect(result).to.deep.equal(Result.ok(BigNumber.from('1234')))
  })

  it('sanitizes hex strings that are valid big numbers', async () => {
    const result = asBigNumber('0xaBf3', '')
    expect(result).to.deep.equal(Result.ok(BigNumber.from('0xaBf3')))
  })

  it('sanitizes numbers', async () => {
    const result = asBigNumber(1234, '')
    expect(result).to.deep.equal(Result.ok(BigNumber.from(1234)))
  })

  it('sanitizes bignumber', async () => {
    const expectedBigNumber = BigNumber.from('1234')
    const result = asBigNumber(expectedBigNumber, '')
    expect(result).to.deep.equal(Result.ok(expectedBigNumber))
  })

  it('does not accept non integers', async () => {
    const result = asBigNumber(1.234567, 'path')
    expect(result).to.deep.equal(
      Result.error([{ path: 'path', expected: 'big number' }])
    )
  })

  it('does not accept non big number strings', async () => {
    const result = asBigNumber('bla bla bla', 'path')
    expect(result).to.deep.equal(
      Result.error([{ path: 'path', expected: 'big number' }])
    )
  })

  it('does not accept types other than string or number', async () => {
    const result = asBigNumber(true, 'path')
    expect(result).to.deep.equal(
      Result.error([{ path: 'path', expected: 'big number' }])
    )
  })
})
