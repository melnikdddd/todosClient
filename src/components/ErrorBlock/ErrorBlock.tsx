import React, {FC} from 'react';


interface ErrorBlockProps{
    errorStr: string;
}
const ErrorBlock: FC<ErrorBlockProps> = ({errorStr}) => {
    return (
        <div className={"bg-red-300 rounded-lg p-2 w-full h-full"}>
            Error: {errorStr}.
        </div>
    );
};

export default ErrorBlock;