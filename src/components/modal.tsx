'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onKeyDown = useCallback(
    (event: { key: string }) => {
      if (event.key === 'Escape') {
        onDismiss()
      }
    },
    [onDismiss],
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  return (
    <Dialog.Root defaultOpen>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[80vh] w-[80vw] max-w-5xl translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-800 p-[25px] focus:outline-none">
          {children}
          <Dialog.Close asChild>
            <button
              className="absolute right-[10px] top-[10px] inline-flex appearance-none items-center justify-center rounded-full text-violet-300 focus:shadow-violet-700 focus:outline-none"
              aria-label="Close"
              onClick={onDismiss}
            >
              <X size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
