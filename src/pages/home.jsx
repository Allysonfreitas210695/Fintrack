import { DatePickerWithRange } from '@/components/date-range-picker'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-amber-50">Dashboard</h2>
          <div className="flex items-center gap-2">
            <DatePickerWithRange />
            <div>
              <Button>Nova Transação +</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
