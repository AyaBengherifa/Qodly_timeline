import { FC, useState, useEffect } from 'react';
import cn from 'classnames';
import { useSources, useEnhancedNode } from '@ws-ui/webform-editor';
import { CgDanger } from 'react-icons/cg';
import { ITimelineProps } from './Timeline.config';
import VerticalTimeLine from './components/VerticalTimeLine';
import HorizontalTimeLine from './components/HorizontalTimeLine';
import TimeLineV2 from './components/TimeLineV2';

const Timeline: FC<ITimelineProps> = ({
  orientation,
  iterator,
  variant,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode((node) => {
    return { linkedNodes: node.data.linkedNodes };
  });
  const {
    sources: { datasource: ds },
  } = useSources();

  const [_value, setValue] = useState<any[]>([]);

  useEffect(() => {
    if (!ds) return;

    const fetchData = async () => {
      const value = await ds.getValue();
      setValue(value);
    };

    fetchData();

    ds.addListener('changed', fetchData);

    return () => ds.removeListener('changed', fetchData);
  }, [ds]);

  return (
    <>
      {ds?.initialValue !== undefined ? (
        <div ref={connect} style={style} className={cn(className, classNames)}>
          {orientation == 'Vertical' && (
            <VerticalTimeLine
              iterator={iterator}
              variant={variant}
              style={style}
              className={className}
              classNames={classNames}
            ></VerticalTimeLine>
          )}
          {orientation == 'Horizontal' && (
            <HorizontalTimeLine
              iterator={iterator}
              variant={variant}
              style={style}
              className={className}
              classNames={classNames}
            ></HorizontalTimeLine>
          )}
          {variant == 'value3' && (
            <TimeLineV2
              iterator={iterator}
              variant={variant}
              style={style}
              className={className}
              classNames={classNames}
            ></TimeLineV2>
          )}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center rounded-lg border bg-purple-400 py-4 text-white">
          <CgDanger className="mb-1 h-8 w-8" />
          <p>Missing a datasource</p>
        </div>
      )}
    </>
  );
};

export default Timeline;
