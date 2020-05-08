import { Contract } from '../src';
import { burrow } from "./test";
import { compile } from '../src/contracts/compile'

describe('Nested contract event emission', function () {

  it('#38', async () => {
    const source = `
      pragma solidity >=0.0.0;
      contract Contract {
          event Event();

          function announce() public {
              emit Event();
          }
      }
    `
    const {abi, code} = compile(source, 'Contract')
    const contract: any = await burrow.contracts.deploy(abi, code)
    const secondContract: any = new Contract(abi, null)
    const stream = secondContract.Event.at(contract.address, function (error, event) {
      if (error) {
        throw error
      } else {
        stream.cancel()
      }
      secondContract.announce()
    })
  })
})
