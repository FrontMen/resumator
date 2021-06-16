import React, { useContext } from "react";
import { OverviewSearch } from "./OverviewSearch";
import { SpacedButton } from "../Material";
import { OverviewList } from "./OverviewList";
import { FirebaseAppContext } from "../../context/FirebaseContext";

export const OverviewContent = ({
  actionClass,
  rootClass,
  isMobile,
  toggleDrawer,
  ...props
}) => {
  const { firebase, user } = useContext(FirebaseAppContext);
  const [searchTerms, setSearchTerms] = React.useState([]);

  const handleSearch = (val = []) => {
    // val = val || [];
    setSearchTerms(val);
    // should pass the search upwards again, so I can pass searchTerms into component with React.clone in indexjsx of this module
  };

  return (
    <div className={rootClass}>
      <div className={actionClass}>
        <SpacedButton
          href="/new"
          variant="contained"
          color="primary"
          marginBottom={2}
        >
          Add Resume
        </SpacedButton>
        <SpacedButton
          href="/skills"
          variant="contained"
          color="primary"
          marginLeft={2}
          marginBottom={2}
        >
          Manage skills
        </SpacedButton>
        {isMobile && (
          <SpacedButton
            onClick={toggleDrawer("left", false)}
            variant="contained"
            color="primary"
            marginBottom={2}
          >
            Close
          </SpacedButton>
        )}
        <OverviewSearch handleSearch={handleSearch} />
      </div>
      <OverviewList
        firebase={firebase}
        user={user}
        searchTerms={searchTerms}
        query={firebase.firestore().collection("resumes")}
      />
    </div>
  );
};
