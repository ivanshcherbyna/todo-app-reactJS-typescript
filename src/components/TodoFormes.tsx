import React, { useRef } from 'react';

interface TodoFormesProps {
	onAdd(title: string): void
}

export const TodoFormes: React.FC<TodoFormesProps> = props => {
	const ref = useRef<HTMLInputElement>(null);

	const keyPressHandler = (event: React.KeyboardEvent) =>{
		if (event.key === 'Enter'){
            props.onAdd(ref.current!.value);
            ref.current!.value = ''; //clear value after keyrPess Enter
        }
	};

	return(
		<div className='input-field mt2'>
			<input
				ref={ref}
				type='text'
				id='title'
				placeholder='Введите название дела'
				onKeyPress={keyPressHandler}
			/>
			<label htmlFor='title' className='active'>
				Введите название дела
			</label>
		</div>
	)
};
