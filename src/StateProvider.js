import React, { createContext, useMemo, useState } from 'react';
import dayjs from 'dayjs';

export const StateContext = createContext(null);

export default function StateProvider({children}) {
    const [userName, setUserName] = useState(null);
    const [gitHubPage,setGitHubPage] = useState(null);
    const [userImgLink,setUserImgLink] = useState(null);
    const [userOrg,setUserOrg] = useState(null);
    const [allUserOrgReposName, setAllUserOrgRrposName] = useState([])
    const [issuesDataList, setIssueDataList] = useState([]);
    const [userOrgReposCommitsData, setUserOrgReposCommitsData] = useState({});
    const [projectStartDate, setProjectStartDate] = React.useState(dayjs('2024-02-26T09:30'));
    const [projectEndDate, setProjectEndDate] = React.useState(dayjs('2024-04-26T23:59'));
    const [selectedMenuIndex, setSelectedMenuIndex] = React.useState(1);

    const state = useMemo(() => {
        return {
            userName,
            setUserName: (value) => setUserName(value),
            gitHubPage,
            setGitHubPage: (value) => setGitHubPage(value),
            userImgLink,
            setUserImgLink: (value) => setUserImgLink(value),
            userOrg,
            setUserOrg: (value) => setUserOrg(value),
            allUserOrgReposName,
            setAllUserOrgRrposName: (value) => setAllUserOrgRrposName(value),
            issuesDataList,
            setIssueDataList: (value) => setIssueDataList(value),
            userOrgReposCommitsData,
            setUserOrgReposCommitsData: (value) => setUserOrgReposCommitsData(value),
            projectStartDate,
            setProjectStartDate: (value) => setProjectStartDate(value),
            projectEndDate,
            setProjectEndDate: (value) => setProjectEndDate(value),
            selectedMenuIndex,
            setSelectedMenuIndex:(value) => setSelectedMenuIndex(value)
        }
    }, [userName, gitHubPage, userImgLink, userOrg, allUserOrgReposName, issuesDataList, userOrgReposCommitsData, projectStartDate, projectEndDate, selectedMenuIndex])

    return (
        <StateContext.Provider value={state}>
            {children}
        </StateContext.Provider>
    )
}