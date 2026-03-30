import { createSignal } from 'solid-js';

type FormData = {
  name: string;
  email: string;
  desc: string;
};

function ReactContact() {
  const [data, setData] = createSignal<Partial<FormData>>({});

  const handleChange = (e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement }) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data()?.name ?? '');
    formData.append('email', data()?.email ?? '');
    formData.append('desc', data()?.desc ?? '');

    const url = 'https://data.endpoint.space/cle0aw3vh001408mkmzhb9hln';

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  };

  return (
    <div class="my-10 flex flex-col space-y-8">
      <h1 class="text-center text-3xl font-semibold text-red-400">Get In Touch</h1>
      <form
        class="flex flex-col"
        method="post"
        action="https://data.endpoint.space/cle0aw3vh001408mkmzhb9hln"
        onsubmit={handleSubmit}
      >
        <div class="my-3 flex flex-col space-y-2">
          <label class="text-lg" for="name">
            Name: `
          </label>
          <input
            required
            class="rounded-lg px-2 py-3 outline-none ring-2 ring-gray-500 invalid:ring-red-400 focus:ring-indigo-500"
            type="text"
            name="name"
            id="name"
            onchange={handleChange}
          />
        </div>
        <div class="my-3 flex flex-col space-y-2">
          <label class="text-lg" for="email">
            Email:{' '}
          </label>
          <input
            required
            class="rounded-lg px-2 py-3 outline-none ring-2 ring-gray-500 invalid:ring-red-400 focus:ring-indigo-500"
            type="email"
            name="email"
            id="email"
            onchange={handleChange}
          />
        </div>
        <div class="my-3 flex flex-col space-y-2">
          <label class="text-lg" for="desc">
            Description:{' '}
          </label>
          <textarea
            required
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            class="rounded-lg px-2 py-3 outline-none ring-2 ring-gray-500 invalid:ring-red-400 focus:ring-indigo-500"
            onchange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          class="rounded-md px-5 py-3 text-lg font-medium text-red-400 ring-2 ring-red-400 transition-all duration-150 ease-in hover:bg-red-400 hover:text-white"
        >
          Submit
        </button>
      </form>
      <div class="flex w-full flex-col space-y-3 text-center">
        <p class="text-lg font-semibold text-gray-500">or</p>
        <p class="text-xl">
          Directly reach out to me at{' '}
          <a href="mailto:hi@mahimsafa.com" class="text-red-400">
            hi@mahimsafa.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default ReactContact;
