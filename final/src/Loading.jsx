function Loading({ className = 'loading', children = 'Loading...' }) {
    return (
        <div className={className}>{children}</div>
    );
}

export default Loading;
