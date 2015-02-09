export default function () {
  this.transition(
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
