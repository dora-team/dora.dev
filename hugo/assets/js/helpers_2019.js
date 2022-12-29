// general helper functions
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
  
  // analysis helper functions
  // algorithm from Handbook of Mathematical Functions (Abramowitz & Stegun),
  // formula 7.1.26
  function normDist(x, mean, standardDeviation) {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;
  
    let val = (mean - x) / (Math.sqrt(2) * standardDeviation);
    let sign = (val < 0) ? -1 : 1;
    var xabs = Math.abs(val);
    var t = 1.0 / (1.0 + xabs * p);
    var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-xabs * xabs);
    var erf = sign * y;
    return (1 - erf) / 2;
  }
  
  function clamp(value, max) {
    return Math.max(Math.min(value, max), 1);
  }
  
  function scalePerf(value) {
    return 20 * (value - 1);
  }