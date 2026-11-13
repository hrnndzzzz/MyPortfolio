// Two-way scroll motion: a block decompresses once its top edge rises above 88% of the screen height,
// and compresses again when it drops back below that line (when scrolling back up).
// Checked every scroll frame, so fast jumps (Back to top, menu links) can't leave a block in the wrong state.
// Blocks scale from their top edge, which stays put, so the state can't flicker at the line.
const blocks = [...document.querySelectorAll('.section-title, .featured, .stack-groups > div, .about-blob, .about-text, .cert, #contact > p, #contact .contact-row, .overview-grid > div, .shots li, .features > div')];
blocks.forEach(el => {
  // items in the same group open 80 ms apart; closing has no delay
  el.style.setProperty('--d', Math.min([...el.parentElement.children].indexOf(el), 6) * 80 + 'ms');
  el.classList.add('reveal');
});
let queued = false;
const update = () => {
  queued = false;
  const line = innerHeight * .88;
  for (const el of blocks) el.classList.toggle('in', el.getBoundingClientRect().top < line);
};
addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
addEventListener('resize', update);
update();
