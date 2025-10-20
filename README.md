
# Solana Arbitrage Bot

High-performance arbitrage engine for Solana that captures price discrepancies across multiple DEX venues — Pump.fun, Meteora DLMM, and dAMM v2 — with a gRPC-driven market data and control plane.

Test transaction (demo run): `https://solscan.io/tx/3oUmy9CMdc2diGxhrkHcVUuWUBZnr7m862J8QxNELMy943T325wspgZmzHhbZsXRqPhEU68UZ3qpCuNSrHoSMTGC`
https://github.com/user-attachments/assets/26a94223-b77f-463c-b480-678c24681d71

---

## Overview

This project is an on-chain arbitrage bot that:

- Monitors multiple Solana venues for mispricings in near real-time
- Computes optimal cross-venue routes (2-leg and 3-leg) including fees, slippage, and gas
- Submits atomic transactions to capture spread with strict risk controls
- Uses a gRPC interface for fast data ingestion, control, and observability

The system is designed for low-latency discovery and execution while remaining configurable and safe for continuous operation.

---

## Key Features

- Cross-venue arbitrage: Pump.fun, Meteora DLMM, dAMM v2
- gRPC control plane: start/stop strategies, parameter updates, health checks
- Deterministic pricing with venue-specific fee and slippage modeling
- Atomic swaps with route validation and pre-flight simulation (when enabled)
- Configurable risk limits (max notional, per-venue caps, daily loss limits)
- Rate limiting and backoff to avoid RPC bans
- Structured logging and run-time metrics

---

## Architecture

```
[ Market Data ]  =>  [ gRPC Server ]  =>  [ Strategy Engine ]  =>  [ Router ]  =>  [ TX Builder ]  =>  Solana RPC
     |                       |                    |                     |                 
     |                       |                    |                     +--> Venue adapters: Pump.fun / Meteora DLMM / dAMM v2
     |                       |                    |
     +--> External price feeds (optional)         +--> Risk module (limits, PnL, exposure)
```

- gRPC Server: Accepts commands, streams metrics, and publishes market snapshots.
- Strategy Engine: Detects spreads, sizes trades, and enforces risk.
- Router: Selects the best executable path across venue adapters.
- Venue Adapters: Normalized interfaces for Pump.fun, Meteora DLMM, and dAMM v2.
- TX Builder: Crafts atomic transactions with compute budget tuning and prioritization fees.

---

## How It Works

1. Subscribe to quotes/orderbooks via gRPC data channels and/or venue polling.
2. Normalize quotes to a common representation (price, size, fees, slippage curve).
3. Identify profitable cycles (2-leg or 3-leg) that exceed configured thresholds.
4. Simulate (optional) and validate all legs with current slots and account states.
5. Construct and send an atomic transaction; confirm with desired commitment.
6. Record results, update risk metrics, and continue scanning.

---

## Requirements

- Node.js or Rust toolchain (depending on your implementation)
- Solana CLI and access to mainnet RPC + WS endpoints
- A funded keypair with enough SOL for compute/prioritization fees
- Optional: Prometheus/Grafana for metrics, Loki for logs

---

## Configuration

Environment variables (example):

```bash
RPC_ENDPOINT=https://mainnet.helius-rpc.com/?api-key=
RPC_WEBSOCKET_ENDPOINT=wss://mainnet.helius-rpc.com/?api-key=
LIL_JIT_ENDPOINT=https://aged-damp-sea.solana-mainnet.quiknode.pro/
LIL_JIT_WEBSOCKET_ENDPOINT=wss://aged-damp-sea.solana-mainnet.quiknode.pro/
JITO_KEY=
BLOCK_ENGINE_URL=ny.mainnet.block-engine.jito.wtf

TX_INTERVAL=10  # seconds

JITO_MODE=true
FEE_LEVEL=5      # 10 is standard
SLIPPAGE=10       # percent
PROFIT_LEVEL=10   # percent
COMMITMENT=processed
JITO_FEE=0.0003

GEYSER_RPC=wss://grpc
```

Per-venue settings can be provided via config files or environment variables (e.g., pool allowlists/denylists, token decimals, slippage curves).

---

## Setup

```bash
# 1) Install dependencies
npm install

# 2) Create a .env file
cp .env.example .env
edit .env

# 3) Verify Solana CLI
solana --version
solana config get

# 4) Fund your keypair
solana balance
```

---

## Running

```bash
# Start the gRPC server and strategy engine
npm run start

# Or run with explicit env overrides
GRPC_PORT=50052 ENABLE_PUMPFUN=false npm run start
```

gRPC interface (examples):

- Start/stop strategy
- Update thresholds (min spread, max notional)
- Stream metrics (PnL, win rate, latency)
- Subscribe to market snapshots

---

## Strategy Controls

- Min spread threshold: Reject routes below net-profit threshold after all fees
- Slippage guard: Size trades to worst-case slippage per venue curve
- Health checks: Halt on repeated failed confirms, RPC errors, or staleness
- Cooldowns: Adaptive backoff after errors or consecutive reverts

---

## Observability

- Structured logs with per-trade breakdown (route, expected vs realized PnL)
- Exported metrics: trades, fills, PnL, error rates, compute, confirmation latency
- Optional tracing for hot paths (routing, account fetching, simulation)

---

## Test Results

- Example mainnet transaction: `https://solscan.io/tx/3oUmy9CMdc2diGxhrkHcVUuWUBZnr7m862J8QxNELMy943T325wspgZmzHhbZsXRqPhEU68UZ3qpCuNSrHoSMTGC`

---

## Safety Notes

- Mainnet trading is risky; spreads can vanish before confirmation
- Always start with small size; validate configs and simulate
- Maintain sufficient SOL for compute/priority fees and rent
- Understand each venue's constraints and failure modes

---

## Roadmap

- Add more venues and RFQ endpoints
- Improve path search (multi-hop, multi-venue) and sizing
- Portfolio-aware risk (inventory targeting, token caps)
- Enhanced strategy tuning via gRPC

---

## Contact

- **Telegram:** [https://t.me/Kei4650](https://t.me/Kei4650)  
- **Twitter:** [https://x.com/kei_4650](https://x.com/kei_4650)  
