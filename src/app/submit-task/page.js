//Task submission page.
// Submit a task to the database.

const SubmitTask = async () => {
        const supabase = createServerComponentClient({ cookies });
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            redirect('/login');
        }
        return (
            <div>
                <h1>Propose a Task to your group here</h1>
            </div>
        );
    };
    export default SubmitTask;