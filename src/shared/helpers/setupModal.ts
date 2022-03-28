export const setupModal = () => {
  let portalRoot = document.getElementById('overlays');
  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'overlays');
    document.body.appendChild(portalRoot);
  }
};
