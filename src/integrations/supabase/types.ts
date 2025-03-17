export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          activity_type_id: string | null
          age_range: string
          age_range_id: string | null
          availability: Json | null
          average_rating: number | null
          booking_requirements: string[] | null
          bookings_count: number | null
          cancellation_policy: string | null
          category: string
          created_at: string
          creator_id: string | null
          creator_name: string | null
          description: string
          duration_minutes: number | null
          excluded_items: string[] | null
          featured_position: number | null
          id: string
          image_url: string | null
          included_items: string[] | null
          is_premium: boolean | null
          location: string
          location_id: string | null
          max_participants: number | null
          meeting_point: Json | null
          min_participants: number | null
          price: number
          published_at: string | null
          rating: number | null
          review_count: number | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          status: string | null
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          activity_type_id?: string | null
          age_range: string
          age_range_id?: string | null
          availability?: Json | null
          average_rating?: number | null
          booking_requirements?: string[] | null
          bookings_count?: number | null
          cancellation_policy?: string | null
          category: string
          created_at?: string
          creator_id?: string | null
          creator_name?: string | null
          description: string
          duration_minutes?: number | null
          excluded_items?: string[] | null
          featured_position?: number | null
          id?: string
          image_url?: string | null
          included_items?: string[] | null
          is_premium?: boolean | null
          location: string
          location_id?: string | null
          max_participants?: number | null
          meeting_point?: Json | null
          min_participants?: number | null
          price?: number
          published_at?: string | null
          rating?: number | null
          review_count?: number | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          status?: string | null
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          activity_type_id?: string | null
          age_range?: string
          age_range_id?: string | null
          availability?: Json | null
          average_rating?: number | null
          booking_requirements?: string[] | null
          bookings_count?: number | null
          cancellation_policy?: string | null
          category?: string
          created_at?: string
          creator_id?: string | null
          creator_name?: string | null
          description?: string
          duration_minutes?: number | null
          excluded_items?: string[] | null
          featured_position?: number | null
          id?: string
          image_url?: string | null
          included_items?: string[] | null
          is_premium?: boolean | null
          location?: string
          location_id?: string | null
          max_participants?: number | null
          meeting_point?: Json | null
          min_participants?: number | null
          price?: number
          published_at?: string | null
          rating?: number | null
          review_count?: number | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_activity_type_id_fkey"
            columns: ["activity_type_id"]
            isOneToOne: false
            referencedRelation: "activity_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_age_range_id_fkey"
            columns: ["age_range_id"]
            isOneToOne: false
            referencedRelation: "age_ranges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_categories: {
        Row: {
          activity_id: string
          category_id: string
          created_at: string | null
        }
        Insert: {
          activity_id: string
          category_id: string
          created_at?: string | null
        }
        Update: {
          activity_id?: string
          category_id?: string
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_categories_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_types: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_premium: boolean | null
          name: string
          price_range_max: number | null
          price_range_min: number | null
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name: string
          price_range_max?: number | null
          price_range_min?: number | null
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name?: string
          price_range_max?: number | null
          price_range_min?: number | null
          slug?: string
        }
        Relationships: []
      }
      age_ranges: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          max_age: number | null
          min_age: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          max_age?: number | null
          min_age: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          max_age?: number | null
          min_age?: number
          name?: string
        }
        Relationships: []
      }
      auth_config: {
        Row: {
          description: string | null
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          description?: string | null
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          description?: string | null
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          author_name: string
          author_title: string | null
          category: string
          content: string
          created_at: string
          excerpt: string
          id: string
          image_url: string | null
          published: boolean | null
          read_time: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          author_name: string
          author_title?: string | null
          category: string
          content: string
          created_at?: string
          excerpt: string
          id?: string
          image_url?: string | null
          published?: boolean | null
          read_time?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          author_name?: string
          author_title?: string | null
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string | null
          published?: boolean | null
          read_time?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          icon_url: string | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          activity_id: string | null
          category: string | null
          content: string
          created_at: string
          id: string
          parent_id: string | null
          post_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_id?: string | null
          category?: string | null
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          post_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_id?: string | null
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          post_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      destinations: {
        Row: {
          country: string
          created_at: string
          id: string
          name: string
          popularity: number | null
          updated_at: string
        }
        Insert: {
          country: string
          created_at?: string
          id?: string
          name: string
          popularity?: number | null
          updated_at?: string
        }
        Update: {
          country?: string
          created_at?: string
          id?: string
          name?: string
          popularity?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      experience_pricing: {
        Row: {
          activity_id: string
          created_at: string | null
          date_from: string
          date_to: string
          description: string | null
          id: string
          max_participants: number | null
          min_participants: number | null
          price: number
          updated_at: string | null
        }
        Insert: {
          activity_id: string
          created_at?: string | null
          date_from: string
          date_to: string
          description?: string | null
          id?: string
          max_participants?: number | null
          min_participants?: number | null
          price: number
          updated_at?: string | null
        }
        Update: {
          activity_id?: string
          created_at?: string | null
          date_from?: string
          date_to?: string
          description?: string | null
          id?: string
          max_participants?: number | null
          min_participants?: number | null
          price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experience_pricing_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_schedules: {
        Row: {
          activity_id: string
          available_spots: number
          booked_spots: number | null
          created_at: string | null
          date: string
          end_time: string
          id: string
          is_available: boolean | null
          notes: string | null
          price_override: number | null
          start_time: string
          updated_at: string | null
        }
        Insert: {
          activity_id: string
          available_spots: number
          booked_spots?: number | null
          created_at?: string | null
          date: string
          end_time: string
          id?: string
          is_available?: boolean | null
          notes?: string | null
          price_override?: number | null
          start_time: string
          updated_at?: string | null
        }
        Update: {
          activity_id?: string
          available_spots?: number
          booked_spots?: number | null
          created_at?: string | null
          date?: string
          end_time?: string
          id?: string
          is_available?: boolean | null
          notes?: string | null
          price_override?: number | null
          start_time?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experience_schedules_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      host_balances: {
        Row: {
          available_balance: number | null
          created_at: string | null
          id: string
          last_withdrawal: Json | null
          pending_balance: number | null
          total_earnings: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          available_balance?: number | null
          created_at?: string | null
          id?: string
          last_withdrawal?: Json | null
          pending_balance?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          available_balance?: number | null
          created_at?: string | null
          id?: string
          last_withdrawal?: Json | null
          pending_balance?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_balances_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          country: string | null
          created_at: string | null
          id: string
          is_featured: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          popularity: number | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          popularity?: number | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          popularity?: number | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          bank_account: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          is_admin: boolean | null
          last_name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          bank_account?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          is_admin?: boolean | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          bank_account?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          is_admin?: boolean | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      withdrawal_requests: {
        Row: {
          amount: number
          bank_account: string
          created_at: string | null
          id: string
          processed_at: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          bank_account: string
          created_at?: string | null
          id?: string
          processed_at?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          bank_account?: string
          created_at?: string | null
          id?: string
          processed_at?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdrawal_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_password_strength: {
        Args: {
          password: string
        }
        Returns: boolean
      }
      is_valid_email: {
        Args: {
          email: string
        }
        Returns: boolean
      }
      is_valid_iban: {
        Args: {
          iban: string
        }
        Returns: boolean
      }
      is_valid_phone: {
        Args: {
          phone: string
        }
        Returns: boolean
      }
      update_auth_config: {
        Args: {
          config_key: string
          config_value: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
