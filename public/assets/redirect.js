(function (l, r) {
  return r.test(l.href) && (l.href = l.href.replace(r, 'http'));
})(location, /^https/);
