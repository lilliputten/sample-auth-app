/** @module NotFoundSection
 *  @since 2022.02.08, 22:44
 *  @changed 2023.01.31, 22:43
 */

import classnames from 'classnames';

import NotFoundContent from '@/components/Common/NotFound/Content/NotFoundContent';

interface TNotFoundSectionProps {
  className?: string;
}

export function NotFoundSection(props: TNotFoundSectionProps): JSX.Element {
  const { className } = props;
  // TODO: Wrap with section (PageSectionWrapper), title etc...
  return (
    <div className={classnames(className)}>
      <NotFoundContent />
    </div>
  );
}
