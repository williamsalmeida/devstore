import { Skeleton } from '@/components/skeleton'

export default function ModalLoading() {
  return (
    <div className="bg-black/40">
      <div className="fixed inset-0 left-[50%] top-[50%] h-[537px] w-[80vw] max-w-5xl translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-900">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  )
}
