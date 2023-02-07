import { t } from '@lingui/macro'
import { X } from 'react-feather'
import { useMedia } from 'react-use'
import styled from 'styled-components'

import Modal from 'components/Modal'
import { NotificationPayload } from 'components/Popups'
import CtaButton from 'components/Popups/CtaButton'
import Row, { RowBetween } from 'components/Row'
import useTheme from 'hooks/useTheme'
import { ExternalLink, MEDIA_WIDTHS } from 'theme'

const Wrapper = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    gap: 20px;
    padding: 20px;
  `}
`
const Title = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`

const ButtonWrapper = styled(Row)`
  gap: 24px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    gap: 12px;
  `}
`

const StyledLink = styled(ExternalLink)`
  &:hover {
    text-decoration: none;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 200px;
    min-width: 100px;
    max-width: 45%;
  `}
`

const StyledCtaButton = styled(CtaButton)`
  width: 220px;
  height: 36px;
  max-width: 100%;
`
export default function CenterPopup({ data, clearAll }: { data: NotificationPayload; clearAll: () => void }) {
  const theme = useTheme()
  const isMobile = useMedia(`(max-width: ${MEDIA_WIDTHS.upToMedium}px)`)
  const { title = t`Important Announcement!`, content, actions = [] } = data.templateBody

  return (
    <Modal isOpen={true} onDismiss={clearAll} maxWidth={isMobile ? undefined : '800px'}>
      <Wrapper>
        <RowBetween align="flex-end">
          <Title>{title}</Title>
          <X cursor={'pointer'} color={theme.subText} onClick={clearAll} />
        </RowBetween>
        <div style={{ fontSize: 14, lineHeight: '20px' }}>{content}</div>
        <ButtonWrapper justify="center">
          {actions.map(item => (
            <StyledLink href={item.url} key={item.url}>
              <StyledCtaButton data={item} />
            </StyledLink>
          ))}
        </ButtonWrapper>
      </Wrapper>
    </Modal>
  )
}
