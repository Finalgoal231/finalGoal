// import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; //, useSelector
import TitleCard from "../../../Cards/TitleCard.jsx";
import { showNotification } from "../../common/headerSlice.js";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const addNewTeamMember = () => {
    dispatch(
      showNotification({ message: "Add New Member clicked", status: 1 })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => addNewTeamMember()}
      >
        Invite New
      </button>
    </div>
  );
};

const TEAM_MEMBERS = [];

function Team() {
  const [members, setMembers] = useState(TEAM_MEMBERS);

  useEffect(() => {
    (async () => {
      const users = await fetch(
        "https://api.github.com/orgs/Finalgoal231/members"
      )
        .then((response) => response.json())
        .catch((error) => console.error("Error:", error));
      const promises = users
        ? users.map(async (l) => {
            const data = await fetch(l.url);
            return await data.json();
          })
        : [];
      Promise.all(promises).then((values) => {
        values.sort((a, b) => b.followers - a.followers);
        setMembers(values);
      });
    })();
  }, []);

  // const getRoleComponent = (role) => {
  //   if (role === "Owner")
  //     return <div className="badge w-24 badge-secondary">{role}</div>;
  //   if (role === "Admin")
  //     return <div className="badge w-24 badge-primary">{role}</div>;
  //   if (role === "Manager") return <div className="badge w-24">{role}</div>;
  //   if (role === "Support")
  //     return <div className="badge w-24 badge-accent">{role}</div>;
  //   else return <div className="badge w-24 badge-ghost">{role}</div>;
  // };

  return (
    <>
      <TitleCard
        title="Active Members"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full text-center">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Bio</th>
                <th>Repositories</th>
                <th>Followers</th>
                <th>Company</th>
                <th>Location</th>
                <th>Last Active</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {members &&
                members.map((l, k) => {
                  return (
                    <tr className="w-full" key={k}>
                      <td>{k + 1}</td>
                      <td>
                        <a href={l.html_url} target="_blank" rel="noreferrer">
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-circle w-12 h-12">
                                <img src={l.avatar_url} alt="Avatar" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {l.name || l.login}
                              </div>
                            </div>
                          </div>
                        </a>
                      </td>
                      <td className="w-1/6">
                        {l.bio &&
                          l.bio.slice(0, 15) + (l.bio.length > 15 ? "..." : "")}
                      </td>
                      <td>{l.public_repos}</td>
                      <td>{l.followers}</td>
                      <td>{l.company}</td>
                      <td>{l.location}</td>
                      <td>{moment(l.updated_at).format("D MMM YYYY")}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Team;
