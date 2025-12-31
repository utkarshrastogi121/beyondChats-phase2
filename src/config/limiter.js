import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
  minTime: 1500, // 1 req per 1.5 sec
  maxConcurrent: 1
});

export default limiter;
