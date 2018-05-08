/* eslint-disable no-mixed-operators,no-param-reassign */
export const smoothScroll = (() => {
  let timer = null;

  const stop = () => {
    clearTimeout(timer);
  };

  const _scrollTo = selector => (selectQuery, callback) => {
    const settings = {
      duration: 1000,
      easing: {
        outQuint(x, t, b, c, d) {
          return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        }
      }
    };
    let percentage;
    const node = selector(selectQuery);
    const nodeTop = node.offsetTop;
    const nodeHeight = node.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowHeight = window.innerHeight;
    const offset = window.pageYOffset;
    const delta = nodeTop - offset;
    const bottomScrollableY = height - windowHeight;
    const targetY = (bottomScrollableY < delta) ?
      bottomScrollableY - (height - nodeTop - nodeHeight + offset) :
      delta;

    const startTime = Date.now();
    percentage = 0;

    if (timer) {
      clearInterval(timer);
    }

    function step() {
      let yScroll;
      const elapsed = Date.now() - startTime;

      if (elapsed > settings.duration) {
        clearTimeout(timer);
      }

      percentage = elapsed / settings.duration;

      if (percentage > 1) {
        clearTimeout(timer);

        if (callback) {
          callback();
        }
      } else {
        yScroll = settings.easing.outQuint(0, elapsed, offset, targetY, settings.duration);
        window.scrollTo(0, yScroll);
        timer = setTimeout(step, 10);
      }
    }

    timer = setTimeout(step, 10);
  };

  const scrollToId = _scrollTo((id) => document.getElementById(id));

  const scrollToClass = _scrollTo((className) => document.getElementsByClassName(className)[0]);

  return {
    scrollToId,
    scrollToClass,
    stop
  };
})();
