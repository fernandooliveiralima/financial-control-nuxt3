import { defineStore } from 'pinia';


import type { Transaction } from '../types/transaction';

export const useDateStore = defineStore('dateFilterStore', () => {

    //currentMonth Function
    const getCurrentMonth = () => {
        let now = new Date();
        return `${now.getFullYear()}-${now.getMonth() + 1}`;
    }

    const filterListByMonth = (date: string, list: Array<Transaction>): Array<Transaction> => {
        let newList: Array<Transaction> = reactive([]);

        let [year, month] = date.split('-');

        for(let i in list){
            if(list[i].date.getFullYear() === parseInt(year)&&
               list[i].date.getMonth()+1 === parseInt(month)
            ){ newList.push(list[i]) }
        }

        return newList;
    }

    const formatCurrentMonth = (currentMonth: string) => {
        let [year, month] = currentMonth.split('-');

        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'Juny',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]

        return `${months[parseInt(month) - 1]} ${year}`;
    }

    const formatDate = (date: Date): string => {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${addZeroToDate(day)}/${addZeroToDate(month)}/${year}`;
    }

    const addZeroToDate = (n: number) => n < 10 ? `0${n}` : `${n}`;

    return {
        getCurrentMonth,
        filterListByMonth,
        formatCurrentMonth,
        formatDate,
        addZeroToDate
    }
})