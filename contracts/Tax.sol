// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.3;
import "hardhat/console.sol";

contract TaxTenPercent {
    constructor() payable {}

    address addr = 0xf810a7c21B4737EE90f85AbC218FF96D6430a885;
    address payable target = payable(addr);

    fallback() external payable {
        target.transfer((msg.value / 100) * 10);
    }
}
