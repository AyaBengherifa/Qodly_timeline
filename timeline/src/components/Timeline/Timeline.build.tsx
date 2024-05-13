import { FC } from 'react';
import cn from 'classnames';
import {
  IteratorProvider,
  selectResolver,
  useEnhancedEditor,
  useEnhancedNode,
} from '@ws-ui/webform-editor';
import { Element } from '@ws-ui/craftjs-core';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { ITimelineProps } from './Timeline.config';

const Timeline: FC<ITimelineProps> = ({
  datasource,
  variant,
  style,
  className,
  classNames = [],
}) => {
  const { resolver } = useEnhancedEditor(selectResolver);
  const {
    //linkedNodes,
    connectors: { connect },
  } = useEnhancedNode((node) => {
    return { linkedNodes: node.data.linkedNodes };
  });
  console.log(variant);

  return (
    <>
      <div ref={connect} style={style} className={cn(className, classNames)}>
        {datasource ? (
          <div>
            {(variant == 'value1' || variant == '') && (
              <div className="flex items-center mb-8 relative">
                <div className="w-3 h-3 bg-gray-400 rounded-full "></div>
                <div className="h-8 w-0.5 bg-gray-400 absolute top-5  ml-0.5 left-0.5"></div>
                <div className="text-gray-700 px-2 py-1 rounded-md text-sm">
                  <IteratorProvider>
                    <Element
                      id="item"
                      className="h-full w-full"
                      role="item"
                      is={resolver.StyleBox}
                      deletable={false}
                      canvas
                    />
                  </IteratorProvider>
                </div>
              </div>
            )}

            {variant == 'value2' && (
              <div className="flex flex-col items-start">
                <div className="flex items-center mb-8 relative">
                  <div className=" text-gray-700 px-2 py-1 rounded-md text-sm">
                    <IteratorProvider>
                      <Element
                        id="item1"
                        className="h-full w-full"
                        role="item1"
                        is={resolver.StyleBox}
                        deletable={false}
                        canvas
                      />
                    </IteratorProvider>
                  </div>
                  <div className="flex-grow flex justify-center">
                    <div className=" w-3 h-3 bg-gray-400 rounded-full flex items-center justify-center mb-2"></div>
                    <div className="h-8 w-0.5 bg-gray-400 absolute top-5  "></div>
                  </div>
                  <div className=" text-gray-700 px-2 py-1 rounded-md text-sm">
                    <IteratorProvider>
                      <Element
                        id="item2"
                        className="h-full w-full"
                        role="item2"
                        is={resolver.StyleBox}
                        deletable={false}
                        canvas
                      />
                    </IteratorProvider>
                  </div>
                </div>
              </div>
            )}
            {variant == 'value3' && (
              <div className="w-2/6 relative  ">
                <div className="border-2-2 absolute border-opacity-20 border-gray-400 h-full border left-1/2"></div>

                <div className="mb-8 flex justify-between items-center right-timeline">
                  <div className=" w-5/12"></div>
                  <div className="z-20 flex items-center order-1 bg-gray-400  w-4 h-4 rounded-full"></div>
                  <div className="order-1  rounded-lg  w-5/12 px-6 py-4">
                    <p className="text-sm text-gray-900 text-opacity-100">
                      <IteratorProvider>
                        <Element
                          id="item"
                          className="h-full w-full"
                          role="item"
                          is={resolver.StyleBox}
                          deletable={false}
                          canvas
                        />
                      </IteratorProvider>
                    </p>
                  </div>
                </div>
                <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                  <div className="order-1 w-5/12"></div>
                  <div className="z-20 flex items-center order-1 bg-gray-400 w-4 h-4 rounded-full"></div>
                  <div className="order-1 rounded-lg  w-5/12 px-6 py-4">
                    <p className="text-sm font-medium leading-snug tracking-wide  text-opacity-100">
                      <IteratorProvider>
                        <Element
                          id="item2"
                          className="h-full w-full"
                          role="item2"
                          is={resolver.StyleBox}
                          deletable={false}
                          canvas
                        />
                      </IteratorProvider>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center rounded-lg border bg-purple-400 py-4 text-white">
            <BsFillInfoCircleFill className="mb-1 h-8 w-8" />
            <p>Please attach a datasource</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Timeline;
