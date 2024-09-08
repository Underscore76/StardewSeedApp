export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export function copyClipboard(e: React.MouseEvent<HTMLElement>) {
  navigator.clipboard.writeText(e.currentTarget.innerText);
}

export function copyTextClipboard(text: string) {
  navigator.clipboard.writeText(text);
}
