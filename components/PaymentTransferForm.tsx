"use client"
import { createTransfer } from '@/lib/actions/dwolla.actions'
import { getBank, getBankByAccountId } from '@/lib/actions/user.actions'
import { decryptId, transferFormSchema } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from "@/components/ui/form"
import {  z } from 'zod'
import TransferCustomInput from './TransferCustomInput'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { createTransaction } from '@/lib/actions/transaction.actions'

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
    const router = useRouter()
    const [isLoading, setisLoading]= useState(false)
    const formSchema = transferFormSchema
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            amount: "",
            senderBank: "",
            shareableId: "",
        }   
    })
    

    const submit = async(values :z.infer<typeof formSchema>) => {
        setisLoading(true)

        try {
            const receiverBankId = decryptId(values.shareableId)
            const receiverBank = await getBankByAccountId({
                accountId:receiverBankId
            })
            const senderBank = await getBank({
                documentId: values.senderBank
            })
            
            const transferParams = {

                sourceFundingSourceUrl: senderBank.fundingSourceUrl,
                destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
                amount: values.amount
                
            }

            const transfer = await createTransfer(transferParams)
            if (transfer) {
                const transaction = {
                    name: values.name,
                    amount: values.amount,
                    senderId: senderBank.userId.$id,
                    senderBankId: senderBank.$id,
                    receiverId: receiverBank.userId.$id,
                    receiverBankId: receiverBank.$id,
                    email: values.email,
                    
                };
                const newTransaction = createTransaction(transaction)
                if (newTransaction) {
                    form.reset()
                    router.push("/")
                    
                }
            }
        } catch (error) {
            console.error("Submitting create transfer request failed: ", error);   
        }
        setisLoading(false)
    }

    return (
        <>
            <div className="payment-transfer_form-details">
                <h2 className="text-18 font-semibold text-gray-900">
                    Transfer details
                </h2>
                <p className="text-16 font-normal text-gray-600">
                    Enter the details of the recipient 
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} >
                    <div>

                    <TransferCustomInput
                        control={form.control}
                        name='senderBank'
                        label='Select Source Bank'
                        description='Select the bank account you want to transfer funds from' 
                        placeHolder="Select Account"    
                        setValue={form.setValue}
                        type='bank-dropdown'    
                        accounts={accounts}    
                    />
                    <TransferCustomInput
                        control={form.control}
                        name='name'
                        label='Transfer Note (Optional)'
                        description='Please provide any additional information or instructions related to the transfer' 
                        placeHolder="Write a short note here"    
                        type='text-area'    
   
                    />
                    </div>
                    <div className="payment-transfer_form-details">
                        <h2 className="text-18 font-semibold text-gray-900">
                            Bank account details
                        </h2>
                        <p className="text-16 font-normal text-gray-600">
                            Enter the bank account details of the recipient
                        </p>
                    </div>
                    <TransferCustomInput
                        control={form.control}
                        name='email'
                        label='Recipient&apos;s Email Address'
                        description='' 
                        placeHolder="ex: johndoe@gmail.com"    
                        type=''    
   
                    />
                    <TransferCustomInput
                        control={form.control}
                        name='shareableId'
                        label='Receiver&apos;s Plaid Sharable Id'
                        description='' 
                        placeHolder="Enter the public account number"    
                        setValue={form.setValue}
                        type=''     
                    />
                    <TransferCustomInput
                        control={form.control}
                        name='amount'
                        label='Amount'
                        description='' 
                        placeHolder="ex: 5.00"    
                        setValue={form.setValue}
                        type=''     
                    />                       

                    <div className='payment-transfer_btn-box'>
                        <Button type="submit" className="payment-transfer_btn">
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
                                </>
                            ) : (
                                "Transfer Funds"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default PaymentTransferForm