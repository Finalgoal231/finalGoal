import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../components/features/common/headerSlice'
import Team from '../../components/features/settings/team'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Team Members"}))
      }, [])


    return(
        <Team/>
    )
}

export default InternalPage