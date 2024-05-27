import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";

const TopSideButtons = () => {
    const dispatch = useDispatch();

    const addNewTeamMember = () => {
        dispatch(showNotification({ message: "Add New Member clicked", status: 1 }));
    };

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => addNewTeamMember()}>
                Invite New
            </button>
        </div>
    );
};

const TEAM_MEMBERS = [
    {
        name: "TrueSt@r",
        avatar: "http://192.168.6.2:3000/avatars/12?s=287",
        email: "truestar@gmail.com",
        role: "admin",
        bio: "AI Engineer",
        lastActive: "2 days ago",
    },
    {
        name: "Shine",
        avatar: "http://192.168.6.2:3000/avatars/1?s=287",
        email: "shine@gmail.com",
        role: "admin",
        bio: "BlockChain",
        lastActive: "2 days ago",
    },
    {
        name: "Yonex",
        avatar: "http://192.168.6.2:3000/avatars/9",
        email: "yandex@gmail.com",
        role: "admin",
        bio: "FullStack",
        lastActive: "20 hr ago",
    },
    {
        name: "Luckystar",
        avatar: "http://192.168.6.2:3000/avatars/2?s=287",
        email: "luckystar@gmail.com",
        role: "admin",
        bio: "FrontEnd",
        lastActive: "1 hr ago",
    },
];

function Team() {
    const [members, setMembers] = useState(TEAM_MEMBERS);

    const getRoleComponent = (role) => {
        if (role === "Admin") return <div className="badge badge-secondary">{role}</div>;
        if (role === "Manager") return <div className="badge">{role}</div>;
        if (role === "Owner") return <div className="badge badge-primary">{role}</div>;
        if (role === "Support") return <div className="badge badge-accent">{role}</div>;
        else return <div className="badge badge-ghost">{role}</div>;
    };

    return (
        <>
            <TitleCard title="Active Members" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>Bio</th>
                                <th>Role</th>
                                <th>Last Active</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {members.map((l, k) => {
                                return (
                                    <tr key={k}>
                                        <td>{k + 1}</td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-circle w-12 h-12">
                                                        <img src={l.avatar} alt="Avatar" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{l.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{l.email}</td>
                                        <td>{l.bio}</td>
                                        <td>{getRoleComponent(l.role)}</td>
                                        <td>{l.lastActive}</td>
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
