import { useState} from "react"
import { useParams } from "react-router-dom"
import { instance } from "../utils/axios"
export const Votes = ({voteNum}) => {
    const {id} = useParams()
    const [incNum, setIncNum] = useState(0)
    const [errorIs, setErrorIs] = useState(true)
    const incVotes = (incNumber) => {

        setIncNum((curr) => curr + incNumber)
        instance.patch(`/reviews/${id}`, {inc_votes: incNumber})
        .then((result)=>{
        }).catch((err)=>{
            setErrorIs(false)
        })

    }
    return (
        <div>
            <p>Votes: {voteNum + incNum}</p>
            <button disabled={incNum === 1} onClick={()=> incVotes(1)}>+1</button>
            <button disabled={incNum === -1} onClick={()=> incVotes(-1)}>-1</button>
            <p hidden={errorIs}>Please refresh and try again</p>
        </div>
    )
}