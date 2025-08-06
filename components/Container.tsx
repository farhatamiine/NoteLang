import React, {ReactNode} from 'react';

const Container = ({children}: { children: ReactNode }) => {
    return (
        <div className={"container mx-auto p-3 max-w-6xl overflow-y-auto"}>
            {children}
        </div>
    );
};

export default Container;