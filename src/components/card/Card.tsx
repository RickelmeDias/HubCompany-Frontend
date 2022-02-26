import PublicIcon from '@mui/icons-material/Public';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function MediaControlCard(props: any) {
  return (
    <div className="card bg-transparent mx-1 w-100">
      <div className="card-body">
        <div className="d-flex">
          { props.type === "world" ?
            <PublicIcon></PublicIcon> :
            <ManageAccountsIcon></ManageAccountsIcon>}
          <h5 className="card-title mx-2">{props.title}</h5>
        </div>
        <p className="card-text">{props.description}</p>
      </div>
    </div>
  );
}
