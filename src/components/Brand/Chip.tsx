import { Avatar, Stack, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { RiCheckLine, RiFileCopyLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Brand } from '../../interface/brand/brand';

interface Props {
  brand: Brand;
  clickable?: boolean;
  avatarSize?: string;
}

export const Chip: React.FC<Props> = ({
  brand,
  clickable = true,
  avatarSize = '40px',
}) => {
  const [copied, setCopied] = useState(false);

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
      <span>{brand._id}</span>
      {copied ? (
        <Check size='1rem' color='green' />
      ) : (
        <Copy onClick={() => copyToClipboard(brand._id)} size='1rem' />
      )}
    </Stack>
  );

  return (
    <Tooltip
      title={<TooltipContent />}
      placement='top-start'
      onClose={handleCopy}
    >
      <Link to={clickable === false ? '#' : `/user/${brand._id}`}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <Stack alignItems='center' sx={{ position: 'relative' }}>
            <Avatar
              alt={brand.name}
              src={brand.logo}
              sx={{ width: avatarSize }}
            />
          </Stack>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <Typography variant='body2'>{brand.name}</Typography>
          </Stack>
        </Stack>
      </Link>
    </Tooltip>
  );
};

const Copy = styled(RiFileCopyLine)`
  cursor: pointer;
`;

const Check = styled(RiCheckLine)`
  cursor: pointer;
`;
