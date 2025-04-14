import type { BoxProps } from '@mui/material/Box';

import { z } from 'zod';
import axios from 'axios';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';

import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  message: z.string().min(1, 'Message is required'),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm({ sx, ...other }: BoxProps) {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      phoneNumber: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await axios.post('http://localhost:5000/api/contact', data);
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error(error.response?.data.message || 'Failed to send message.');
    }
  };

  return (
    <Box sx={sx} {...other}>
      <Typography variant="h3">
        Feel free to contact us. <br />
        We&apos;ll be glad to hear from you buddy.
      </Typography>

      <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Box gap={3} display="flex" flexDirection="column" sx={{ my: 5 }}>
          <Field.Text
            name="name"
            fullWidth
            label="Name"
            error={!!methods.formState.errors.name}
            helperText={methods.formState.errors.name?.message}
          />
          <Field.Text
            name="email"
            fullWidth
            label="Email"
            error={!!methods.formState.errors.email}
            helperText={methods.formState.errors.email?.message}
          />
          <Field.Text
            name="subject"
            fullWidth
            label="Subject"
            error={!!methods.formState.errors.subject}
            helperText={methods.formState.errors.subject?.message}
          />
          <Field.Text
            name="phoneNumber"
            fullWidth
            label="Phone number"
            error={!!methods.formState.errors.phoneNumber}
            helperText={methods.formState.errors.phoneNumber?.message}
          />
          <Field.Text
            name="message"
            fullWidth
            label="Enter your message here."
            multiline
            rows={4}
            error={!!methods.formState.errors.message}
            helperText={methods.formState.errors.message?.message}
          />
          <LoadingButton
            type="submit"
            size="large"
            variant="contained"
            loading={methods.formState.isSubmitting}
          >
            Submit
          </LoadingButton>
        </Box>
      </Form>
    </Box>
  );
}
