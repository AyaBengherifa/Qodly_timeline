import { FC, useEffect } from 'react';
import cn from 'classnames';
import {
  useSources,
  useEnhancedEditor,
  selectResolver,
  useEnhancedNode,
  useDataLoader,
  unsubscribeFromDatasource,
  EntityProvider,
} from '@ws-ui/webform-editor';
import { Element } from '@ws-ui/craftjs-core';

interface ITimeLineV2Props extends webforms.ComponentProps {
  variant?: string;
}

const TimeLineV2: FC<ITimeLineV2Props> = ({
  iterator,
  variant,
  style,
  className,
  classNames = [],
}) => {
  const { resolver } = useEnhancedEditor(selectResolver);
  const {
    connectors: { connect },
  } = useEnhancedNode((node) => {
    return { linkedNodes: node.data.linkedNodes };
  });
  const {
    sources: { datasource: ds, currentElement: currentDs },
  } = useSources();
  const { entities, fetchIndex } = useDataLoader({ source: ds });

  useEffect(() => {
    fetchIndex(0);
  }, []);

  useEffect(() => {
    if (!ds) {
      return;
    }

    const cb = () => {
      ds.getValue('length').then((_length) => {
        fetchIndex(0);
      });
    };

    ds.addListener('changed', cb);

    return () => {
      unsubscribeFromDatasource(ds, cb);
    };
  }, [ds, fetchIndex]);

  return (
    <>
      <div ref={connect} style={style} className={cn(className, classNames)}>
        {variant == 'value3' &&
          entities.map((item, index) => (
            <div className="w-1/6 relative wrap overflow-hidden  " key={item.__KEY}>
              {index !== entities.length - 1 && (
                <div className="border-2-2 absolute  border-opacity-20 border-gray-400 h-full border left-1/2"></div>
              )}
              <div className="mb-8 flex justify-between items-center right-timeline">
                <div className=" w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-gray-400  w-4 h-4 rounded-full"></div>
                <div className="order-1  rounded-lg  w-5/12 px-6 py-4">
                  <p className="text-sm text-gray-900 text-opacity-100">
                    {' '}
                    <EntityProvider
                      index={index}
                      selection={ds}
                      current={currentDs?.id}
                      iterator={iterator}
                    >
                      <Element
                        id="item"
                        className="h-full w-full"
                        role="item"
                        is={resolver.StyleBox}
                        deletable={false}
                        canvas
                      />
                    </EntityProvider>
                  </p>
                </div>
              </div>
              <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-gray-400 w-4 h-4 rounded-full"></div>
                <div className="order-1 rounded-lg  w-5/12 px-6 py-4">
                  <p className="text-sm font-medium leading-snug tracking-wide  text-opacity-100">
                    <EntityProvider
                      index={index}
                      selection={ds}
                      current={currentDs?.id}
                      iterator={iterator}
                    >
                      <Element
                        id="item2"
                        className="h-full w-full"
                        role="item2"
                        is={resolver.StyleBox}
                        deletable={false}
                        canvas
                      />
                    </EntityProvider>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default TimeLineV2;
