import {Map} from 'immutable'
import {Response} from '../../contexts/practice-context'
import { ChallengeStatus } from '../../quiz-too'

interface Props {
    sessionData:Map<number, Response>
    onClickItem: (id:number)=>void
}

const MoreInformation = (props:Props) => {
    const {sessionData} = props
    const idleCount = sessionData.filter(item=>item.status === ChallengeStatus.IDLE).count()
    const correctCount = sessionData.filter(item=>item.status === ChallengeStatus.CORRECT).count()
    const wrongCount = sessionData.filter(item=>item.status === ChallengeStatus.WRONG).count()

    console.log(idleCount, correctCount, wrongCount)

    const getStatusColor = (status:ChallengeStatus) => {
        switch(status){
            case ChallengeStatus.CORRECT: {
                return "text-green-500 font-extrabold"
            }
            case ChallengeStatus.WRONG: {
                return "text-red-500 font-extrabold"
            }
            default:{
                return "font-normal"
            }
        }

    }


    return (
        <div className="p-4 overflow-y-scroll h-60">
            <div className="grid grid-flow-row-dense grid-cols-6 md:grid-cols-9 xl:grid-cols-12 gap-4">
                {sessionData.entrySeq().map(([key, value])=>{
                    return <span className={`cursor-pointer p-1 text-center font-thin border-transparent border-b-2 rounded-md hover:border-primary-700 dark:hover:border-gray-100 ${getStatusColor(value.status)}`} key={key} onClick={()=>props.onClickItem(key)}>{key}</span>
                })}

            </div>
        </div>
    )
}

export default MoreInformation;