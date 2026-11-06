import { useEffect, useRef, useState, type FormEvent } from 'react';

const creatorPasswordHash = '9db89d0ec12817ff3cf9e21382813573476877e09fa0246198c780d7cb6c0351';

export default function CreatorAccessDialog({ onCancel, onUnlock }: {
  onCancel: () => void;
  onUnlock: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current!;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get('password') ?? '');
    if (!window.crypto?.subtle) {
      setError('Open Iron Forge over HTTPS or localhost to use creator access.');
      return;
    }
    const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    if (!dialogRef.current?.open) return;
    const hash = Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
    if (hash === creatorPasswordHash) onUnlock();
    else setError('Incorrect password. Try again.');
  }

  return (
    <dialog ref={dialogRef} aria-labelledby="creator-title" aria-describedby="creator-description"
      onCancel={event => { event.preventDefault(); onCancel(); }}
      className="forge-scroll-panel fixed inset-0 m-auto w-full max-w-md rounded-3xl border border-orange-400/30 bg-zinc-950 p-6 text-zinc-100 shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm">
      <h2 id="creator-title" className="text-3xl font-black text-white">Creator access</h2>
      <p id="creator-description" className="mt-2 text-sm text-zinc-300">Unlock every theme and stage on this device.</p>
      <form onSubmit={submit}>
        <label htmlFor="creator-password" className="mt-5 block text-sm font-bold text-zinc-200">Admin password</label>
        <input id="creator-password" name="password" type="password" autoFocus required autoComplete="off"
          onChange={() => setError('')} aria-invalid={Boolean(error)} aria-describedby={error ? 'creator-error' : undefined}
          className="mt-2 w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white focus:border-orange-400" />
        {error && <p id="creator-error" role="alert" className="mt-3 text-sm font-bold text-red-300">{error}</p>}
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-3 font-bold text-zinc-200 hover:bg-zinc-800">Cancel</button>
          <button type="submit" className="rounded-2xl bg-orange-500 px-5 py-3 font-black text-white hover:bg-orange-600">Unlock everything</button>
        </div>
      </form>
    </dialog>
  );
}
