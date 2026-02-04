import React, { useState, useEffect, useRef } from 'react';

interface EditableItemProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    multiline?: boolean;
    placeholder?: string;
    tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export const EditableItem: React.FC<EditableItemProps> = ({
    value,
    onChange,
    className = "",
    multiline = false,
    placeholder = "Click to edit",
    tagName = 'span'
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            if (multiline) {
                inputRef.current.style.height = 'auto';
                inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
            }
        }
    }, [isEditing, multiline]);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLocalValue(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (localValue !== value) {
            onChange(localValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            handleBlur();
        }
    };

    if (isEditing) {
        const commonClasses = `bg-transparent outline-none border-b border-blue-500 w-full ${className}`;

        if (multiline) {
            return (
                <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    className={commonClasses}
                    value={localValue}
                    onChange={handleInput}
                    onBlur={handleBlur}
                    rows={1}
                    style={{ resize: 'none', overflow: 'hidden' }}
                />
            );
        }

        return (
            <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                className={commonClasses}
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
        );
    }

    const Tag = tagName as any;

    return (
        <Tag
            onClick={() => setIsEditing(true)}
            className={`cursor-text hover:bg-blue-50/50 hover:outline-dashed hover:outline-1 hover:outline-blue-300 rounded px-0.5 -mx-0.5 transition-colors duration-200 ${!value ? 'text-gray-400 italic' : ''} ${className}`}
        >
            {value || placeholder}
        </Tag>
    );
};
