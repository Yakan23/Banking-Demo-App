        
import React from 'react'
import { FormControl, FormField, FormLabel, FormItem, FormDescription, FormMessage } from './ui/form'
import { z } from 'zod'
import { transferFormSchema } from '@/lib/utils'
import { Control, FieldPath, UseFormSetValue } from 'react-hook-form'
import { BankDropdown } from './BankDropdown'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'

interface TransferCustomInput  {
    control: Control<z.infer<typeof transferFormSchema>>,
    name: FieldPath<z.infer<typeof transferFormSchema>>,
    setValue?: UseFormSetValue<z.infer<typeof transferFormSchema>>,
    label: string,
    description: string,
    placeHolder:string,
    type: string
    accounts?:Account[]

}
const TransferCustomInput = ({control,name,label,description,type,setValue,accounts,placeHolder }: TransferCustomInput) => {
  return (
    <FormField
          control= {control}
          name= {name}
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item pb-6 pt-5">
                <div className="payment-transfer_form-content">
                  <FormLabel className="text-14 font-medium text-gray-700">
                    {label}
                  </FormLabel>
                  <FormDescription className="text-12 font-normal text-gray-600">
                    {description}
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                        {type === "bank-dropdown" ? (
                        
                              <FormControl>
                                  <BankDropdown
                                      accounts={accounts}
                                      setValue={setValue}
                                      otherStyles="!w-full"
                                  />
                              </FormControl>
                          ) : type === "text-area"? (
                              
                                    <Textarea
                                        placeholder={placeHolder}
                                        className="input-class"
                                        {...field}
                                    />
                                ) :
                                    <FormControl>
                                        <Input
                                            placeholder={placeHolder}
                                             className="input-class"
                                            {...field}
                                        />
                                    </FormControl>
                            
                        }
                    
                
                    <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />
  )
}

export default TransferCustomInput



