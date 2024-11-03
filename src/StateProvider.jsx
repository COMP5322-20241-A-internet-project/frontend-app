import React, { createContext, useMemo, useState } from 'react';

export const StateContext = createContext(null);

export default function StateProvider({children}) {
    const [userName, setUserName] = useState(null);
    const [gitHubPage,setGitHubPage] = useState(null);
    const [userImgLink,setUserImgLink] = useState(null);
    const [userOrg,setUserOrg] = useState(null);
    const [allUserOrgReposName, setAllUserOrgRrposName] = useState([])
    const [issuesDataList, setIssueDataList] = useState([]);
    const [userOrgReposCommitsData, setUserOrgReposCommitsData] = useState({});
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
            selectedMenuIndex,
            setSelectedMenuIndex:(value) => setSelectedMenuIndex(value)
        }
    }, [userName, gitHubPage, userImgLink, userOrg, allUserOrgReposName, issuesDataList, userOrgReposCommitsData, selectedMenuIndex])

    return (
        <StateContext.Provider value={state}>
            {children}
        </StateContext.Provider>
    )
}