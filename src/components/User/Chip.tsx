import { Avatar, Stack, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import toast from 'react-hot-toast';
import {
  RiCheckLine,
  RiFileCopyLine,
  RiShieldCheckFill,
  RiSpam3Fill,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

interface User {
  _id: string;
  username: string;
  profile_picture: string;
  locale: string;
  banned: boolean;
}

interface Props {
  user: User;
  clickable?: boolean;
  avatarSize?: string;
}

export const Chip: React.FC<Props> = ({
  user,
  clickable = true,
  avatarSize = '40px',
}) => {
  const [copied, setCopied] = useState(false);
  // let countryCode = user.locale.slice(-2).toLowerCase();
  // if (countryCode === 'en') countryCode = 'gb';

  const handleCopy = useCallback(() => {
    setCopied(false);
  }, [setCopied]);

  const copyToClipboard = useCallback((userId: string) => {
    setCopied(true);
    navigator.clipboard.writeText(userId);
    toast.success('Copied to clipboard');
  }, []);

  const TooltipContent = () => (
    <Stack direction='row' alignItems='center' spacing={1}>
      <span>{user._id}</span>
      {copied ? (
        <Check size='1rem' color='green' />
      ) : (
        <Copy onClick={() => copyToClipboard(user._id)} size='1rem' />
      )}
    </Stack>
  );

  return (
    <Tooltip
      title={<TooltipContent />}
      placement='top-start'
      onClose={handleCopy}
    >
      <Link to={clickable === false ? '#' : `/user/${user._id}`}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <Stack alignItems='center' sx={{ position: 'relative' }}>
            <Avatar
              alt={user.username}
              src={user.profile_picture}
              sx={{ width: avatarSize }}
            />
            {/* <Flag
              countryCode={countryCode}
              svg
              cdnUrl='https://flagicons.lipis.dev/flags/4x3/'
              cdnSuffix='svg'
              style={{ width: '16px', height: '16px' }}
            /> */}
          </Stack>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <Typography variant='body2'>{user.username}</Typography>
            {user.banned ? (
              <RiSpam3Fill color='#BA0F30' />
            ) : (
              <RiShieldCheckFill color='#00A300' />
            )}
          </Stack>
        </Stack>
      </Link>
    </Tooltip>
  );
};

const Flag = styled(ReactCountryFlag)`
  position: absolute;
  bottom: -8px;
  border-radius: 50%;
`;

const Copy = styled(RiFileCopyLine)`
  cursor: pointer;
`;

const Check = styled(RiCheckLine)`
  cursor: pointer;
`;
