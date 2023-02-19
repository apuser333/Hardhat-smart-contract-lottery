const { network, ethers } = require("hardhat")
// const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // const BASE_FEE = "250000000000000000"
    const BASE_FEE = ethers.utils.parseEther("0.25")
    const GAS_PRICE_LINK = 1e9

    if (chainId === 31337) {
        log("----------------------------------------------------")
        log("Deploying Mocks")
        const Mocks = await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            args: [BASE_FEE, GAS_PRICE_LINK],
            log: true,
            // we need to wait if on a live network so we can verify properly
            // waitConfirmations: network.config.blockConfirmations || 1,
        })
        log(`Mocks deployed at ${Mocks.address}`)
    }
}

module.exports.tags = ["all", "mocks"]
