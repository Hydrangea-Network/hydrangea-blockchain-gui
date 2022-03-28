import Big from 'big.js';

const MOJO_PER_CHIA = Big('1000000000000');
const BLOCKS_PER_YEAR = 1681920;
const POOL_REWARD = '0.72'; // 90 / 125
const FARMER_REWARD = '0.08'; // 10 / 125
const BLOCK_REWARDS = '125';
const PREFARM = '21000000';

export function calculatePoolReward(height: number): Big {
  if (height === 0) {
    return MOJO_PER_CHIA.times(PREFARM).times(POOL_REWARD);
  }
  if (height < 3 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(BLOCK_REWARDS).times(POOL_REWARD);
  }
  if (height < 6 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(BLOCK_REWARDS).times('0.5').times(POOL_REWARD);
  }
  if (height < 9 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(BLOCK_REWARDS).times('0.25').times(POOL_REWARD);
  }
  if (height < 12 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(BLOCK_REWARDS).times('0.125').times(POOL_REWARD);
  }

  return MOJO_PER_CHIA.times(BLOCK_REWARDS).times('0.0625').times(POOL_REWARD);
}

export function calculateBaseFarmerReward(height: number): Big {
  if (height === 0) {
    return MOJO_PER_CHIA.times(PREFARM).times(FARMER_REWARD);
  }
  if (height < 3 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(BLOCK_REWARDS).times(FARMER_REWARD);
  }
  if (height < 6 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(BLOCK_REWARDS).times('0.5').times(FARMER_REWARD);
  }
  if (height < 9 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(BLOCK_REWARDS).times('0.25').times(FARMER_REWARD);
  }
  if (height < 12 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(BLOCK_REWARDS).times('0.125').times(FARMER_REWARD);
  }

  return MOJO_PER_CHIA.times(BLOCK_REWARDS).times('0.0625').times(FARMER_REWARD);
}
