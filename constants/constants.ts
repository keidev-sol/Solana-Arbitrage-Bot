import { Connection } from "@solana/web3.js"
import { retrieveEnvVariable } from "../utils"
import Client from "@triton-one/yellowstone-grpc"

export const PRIVATE_KEY = retrieveEnvVariable('PRIVATE_KEY')
export const RPC_ENDPOINT = retrieveEnvVariable('RPC_ENDPOINT')
export const RPC_WEBSOCKET_ENDPOINT = retrieveEnvVariable('RPC_WEBSOCKET_ENDPOINT')
export const LIL_JIT_ENDPOINT = retrieveEnvVariable('LIL_JIT_ENDPOINT')
export const LIL_JIT_WEBSOCKET_ENDPOINT = retrieveEnvVariable('LIL_JIT_WEBSOCKET_ENDPOINT')
export const BLOCK_ENGINE_URL = retrieveEnvVariable('BLOCK_ENGINE_URL')
export const TX_INTERVAL = Number(retrieveEnvVariable('TX_INTERVAL'))
export const JITO_FEE = Number(retrieveEnvVariable('JITO_FEE'))
export const SLIPPAGE = Number(retrieveEnvVariable('SLIPPAGE'))
export const FEE_LEVEL = Number(retrieveEnvVariable('FEE_LEVEL'))
export const PROFIT_LEVEL = Number(retrieveEnvVariable('PROFIT_LEVEL'))
export const JITO_KEY = retrieveEnvVariable('JITO_KEY')
export const JITO_MODE = retrieveEnvVariable('JITO_KEY') === 'true'
export const COMMITMENT = retrieveEnvVariable('COMMITMENT') == "processed" ? "processed" : "confirmed"

export const GEYSER_RPC = retrieveEnvVariable('GEYSER_RPC')
export const PUMPFUN_PROGRAM_ADDRESS = "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
export const filterTime = 60000

export const solanaConnection = new Connection(RPC_ENDPOINT, {
    wsEndpoint: RPC_WEBSOCKET_ENDPOINT,
    commitment: 'confirmed',
});

export const client = new Client( "https://grpc.solanavibestation.com", undefined, undefined );
// export const client = new Client( "https://basic.grpc.solanavibestation.com", 'a74b5439be597b1c1e295eb4ac066904', undefined );
// export const client = new Client( "https://grpc-ams-3.erpc.global", '2cd69a80-faa3-43fc-9991-6260d99ac3a7', undefined );