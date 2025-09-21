import { formatCurrency } from '@/helpers/currency'

import TransactionTypeIcon from './transaction-type-icon'
import { Card, CardContent } from './ui/card'

const BalanceItem = ({ label, icon, amount }) => {
  return (
    <Card className={'border-muted-foreground rounded-xl bg-[#171717]'}>
      <CardContent className="space-y-2 p-6">
        <TransactionTypeIcon icon={icon} label={label} />
        <h3 className="text-2xl font-semibold text-amber-50">
          {formatCurrency(amount)}
        </h3>
      </CardContent>
    </Card>
  )
}

export default BalanceItem
